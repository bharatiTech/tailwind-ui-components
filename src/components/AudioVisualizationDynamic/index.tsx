import { useRef, useState } from "react";
import WaveForm from "./WaveForm";

export type AnalyserData = {
  analyzer: AnalyserNode;
  bufferLength: number;
  dataArray: Uint8Array<ArrayBuffer>;
};

const AudioVisualizationDynamic = () => {
  const [audioUrl, setAudioUrl] = useState<string>();
  const [analyzerData, setAnalyzerData] = useState<AnalyserData | null>(null);
  const audioElmRef = useRef<HTMLAudioElement | null>(null);

  const audioAnalyzer = () => {
    if (!audioElmRef.current) return;

    const audioCtx = new window.AudioContext();
    const analyzer = audioCtx.createAnalyser();
    analyzer.fftSize = 2048;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const source = audioCtx.createMediaElementSource(audioElmRef.current);
    source.connect(analyzer);
    source.connect(audioCtx.destination);
    // source?.onended = () => {
    //   source.disconnect();
    // };

    setAnalyzerData({ analyzer, bufferLength, dataArray });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioUrl(URL.createObjectURL(file));
    audioAnalyzer();
  };

  return (
    <div className="p-1 border-1 border-b-amber-950 rounded-md">
      <h1>Audio Visualizer</h1>
      {analyzerData && <WaveForm analyzerData={analyzerData} />}
      <div
        style={{
          height: 40,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <input type="file" accept="audio/*" onChange={onFileChange} />
        <audio src={audioUrl ?? ""} controls ref={audioElmRef} />
      </div>
    </div>
  );
};

export default AudioVisualizationDynamic;
