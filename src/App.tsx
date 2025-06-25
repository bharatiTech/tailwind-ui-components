import Banner from "./components/Banner";
import Toast from "./components/Toast";

function App() {
  return (
    <div className="flex flex-col gap-2 p-4">
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
      <Banner
        title="Title"
        description="This is a description of the banner. Buttons communicate actions that users can take. They are typically placed throughout your UI, in places like Modal windows, Forms, Cards, Toolbars"
        actionLabel="Save this ****"
      />
    </div>
  );
}

export default App;
