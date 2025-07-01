import { useEffect, useRef, useState } from "react";
import Button from "../Button";

const AudioVisualizationStatic = () => {
  const [frequencyData, setFrequencyData] = useState<number[] | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [toggleAudio, setToggleAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setAudioUrl(URL.createObjectURL(file));

    const arrayBuffer = await file.arrayBuffer();

    // Decode the audio
    const audioCtx = new window.AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const sampleRate = audioBuffer.sampleRate;
    const numChannels = audioBuffer.numberOfChannels;

    // OfflineAudioContext to render silently
    const length = audioBuffer.length;
    const offlineCtx = new OfflineAudioContext(numChannels, length, sampleRate);

    const source = offlineCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineCtx.destination);
    source.start();

    const renderedBuffer = await offlineCtx.startRendering();

    // Now extract raw samples for analysis
    const channelData = renderedBuffer.getChannelData(0); // only left channel for now

    // Process audio in chunks for pseudo-frequency analysis (e.g. RMS energy or FFT)
    const chunkSize = 1024;
    const frequencies: number[] = [];

    for (let i = 0; i < channelData.length; i += chunkSize) {
      const chunk = channelData.slice(i, i + chunkSize);
      const energy = getEnergy(chunk); // or use FFT for real frequency
      frequencies.push(energy);
    }

    setFrequencyData(frequencies);
  }

  // Simple RMS (root mean square) energy function (not true frequency, but works as visual intensity)
  function getEnergy(samples: Float32Array<ArrayBuffer>) {
    let sum = 0;
    for (let i = 0; i < samples.length; i++) {
      sum += samples[i] * samples[i];
    }
    return Math.sqrt(sum / samples.length);
  }

  function generateAudioWave(freq: number[]) {
    if (canvasRef.current === null || freq.length <= 0) return;
    const canvas = canvasRef.current;

    const canvasCtx = canvas.getContext("2d");
    if (canvasCtx === null) return;

    const barWidth = 2;
    const spacing = 4; // bar + gap (equivalent to 2px gap)
    canvas.width = freq.length * spacing;

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    freq.forEach((frequency, freqIndex) => {
      const barHeight = frequency * 100;
      const x = freqIndex * spacing;
      const y = canvas.height - barHeight;

      canvasCtx.fillStyle = "#0D98BA";
      canvasCtx.lineWidth = 2;
      canvasCtx.fillRect(x, y - 100, barWidth, barHeight);
    });
  }

  function generateWave1(freq: number[]) {
    if (svgRef.current === null) return;

    const svgElem = svgRef.current;
    const barWidth = 2;
    const spacing = 4;

    svgElem.innerHTML = "";
    svgElem.setAttribute("width", (freq.length * spacing).toString());

    freq.forEach((frequency, freqIndex) => {
      const newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      const barHeight = frequency * 100;
      const x = freqIndex * spacing;
      const y = 10;

      newRect.setAttribute("x", x.toString());
      newRect.setAttribute("y", y.toString());
      newRect.setAttribute("width", barWidth.toString());
      newRect.setAttribute("height", barHeight.toString());
      newRect.setAttribute("fill", "#0D98BA");

      svgElem.appendChild(newRect);
    });
  }

  function generateWave(freq: number[]) {
    if (svgRef.current === null) return;

    const svgElem = svgRef.current;
    const barWidth = 2;
    const spacing = 4;
    const barMaxHeight = 100;

    const totalWidth = freq.length * spacing;
    const totalHeight = barMaxHeight;

    // Clean previous bars
    svgElem.innerHTML = "";

    console.log({ totalWidth, totalHeight });

    // Set proper SVG size & viewBox
    svgElem.setAttribute("width", totalWidth.toString());
    svgElem.setAttribute("height", totalHeight.toString());
    svgElem.setAttribute("viewBox", `100 0 ${totalWidth} ${totalHeight}`);
    // svgElem.setAttribute("viewBox", `0 0 ${1500} ${100}`);
    svgElem.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    freq.forEach((frequency, freqIndex) => {
      const freqRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

      const barHeight = frequency * barMaxHeight;
      const x = freqIndex * spacing;
      const y = totalHeight - barHeight;

      freqRect.setAttribute("id", `freq-${freqIndex}`);
      freqRect.setAttribute("x", x.toString());
      freqRect.setAttribute("y", y.toString());
      freqRect.setAttribute("width", barWidth.toString());
      freqRect.setAttribute("height", barHeight.toString());
      freqRect.setAttribute("fill", "#0D98BA");
      freqRect.setAttribute("rx", "5");

      svgElem.appendChild(freqRect);
    });
  }

  // useEffect(() => {
  //   if (frequencyData) generateAudioWave(frequencyData);
  // }, [frequencyData]);

  useEffect(() => {
    if (frequencyData) generateWave(frequencyData);
  }, [frequencyData]);

  return (
    <div className="p-4 border-1 border-fuchsia-600 rounded-md flex flex-col gap-2 items-start flex-nowrap overflow-auto">
      <h1>Offline Audio Frequency Extraction</h1>
      <input
        type="file"
        accept="audio/*"
        onChange={onFileChange}
        className="border-1 border-[#ccc] p-1 rounded-md cursor-pointer"
      />

      {audioUrl.trim() !== "" && (
        <div className="flex flex-row gap-1 items-start">
          <audio
            src={audioUrl}
            hidden
            controls
            ref={audioRef}
            onSeeking={(e) => {
              console.log("seeking...timestamp: ", e.timeStamp);
            }}
          />

          {!toggleAudio ? (
            <Button
              onClick={() => {
                if (audioRef.current === null) return;
                audioRef.current.play();
                setToggleAudio(true);
              }}
              size="small"
            >
              Play
            </Button>
          ) : (
            <Button
              onClick={() => {
                if (audioRef.current === null) return;
                audioRef.current.pause();
                setToggleAudio(false);
              }}
              size="small"
            >
              Pause
            </Button>
          )}

          {/* {frequencyData && (
            <div
              className="flex flex-row flex-nowrap items-center relative border-1 border-[#ccc] p-1 rounded-md overflow-auto"
              style={{ gap: "2px" }}
            >
              {frequencyData.map((val, idx) => (
                <div
                  id={val.toString()}
                  key={idx}
                  style={{ width: "2px", borderRadius: "5px", height: val * 100, background: "#0D98BA" }}
                />
              ))}
            </div>
          )} */}

          {/* {frequencyData && <canvas ref={canvasRef} style={{ border: "1px solid red" }} />} */}

          <svg height="200" viewBox="0 0 200 200" ref={svgRef} style={{ border: "1px solid black" }} />
        </div>
      )}
    </div>
  );
};

export default AudioVisualizationStatic;
