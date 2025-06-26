import Banner from "./components/Banner";
import Button from "./components/Button";
import Toast from "./components/Toast";
import SuccessIcon from "./assets/icons/success.svg?react";
import Rating from "./components/Rating";
import Slider from "./components/Slider";

function App() {
  return (
    <div className="flex flex-col gap-2 p-4">
      {/* Toasts */}
      <p>Toasts</p>
      <Toast
        title="Success!"
        variant="error"
        description="File uploaded successfully."
        closable
        transitionDirection="right"
      />
      <Toast
        title="Success :: This title is a bit very very long to test ui compatibility"
        variant="info"
        description="This title is a bit very very long to test ui compatibility"
        closable
        transitionDirection="left"
      />
      <Toast title="Success!" variant="success" description="Data saved successfully." closable />
      <Toast
        title="Success!"
        variant="warning"
        description="File uploaded successfully."
        closable
        transitionDirection="left"
      />

      {/* Buttons */}
      <div className="flex flex-col gap-1 items-start border-1 p-2 rounded-xl border-gray-500">
        <p>Buttons</p>

        <Button size="large">A Large Button</Button>
        <Button size="medium">Medium</Button>
        <Button size="small">Small</Button>
        <Button size="small" variant="secondary" endIcon={<SuccessIcon style={{ width: "17px", height: "17px" }} />}>
          Small with end icon
        </Button>
        <Button size="small" variant="terciary">
          Small
        </Button>
        <Button size="medium" variant="secondary" startIcon={<SuccessIcon style={{ width: "20px", height: "20px" }} />}>
          Medium with start icon
        </Button>
        <Button size="medium" variant="terciary">
          Medium
        </Button>
      </div>

      {/* Banner */}
      <p>Banner</p>
      <Banner
        title="Title"
        description="This is a description of the banner. Buttons communicate actions that users can take. They are typically placed throughout your UI, in places like Modal windows, Forms, Cards, Toolbars"
        actionLabel="Confirm"
        imageUrl="https://picsum.photos/200"
      />

      {/* Rating */}
      <Rating />

      {/* Slider */}
      <Slider />
    </div>
  );
}

export default App;
