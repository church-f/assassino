import Toast from "./Toast.jsx";

export const showToast = (props) => {
    const toastContainer = document.createElement('div');
    document.body.appendChild(toastContainer);
    
    const root = ReactDOM.createRoot(toastContainer);
    // root.render(<Toast {...props} />);
    debugger
    return () => {
        root.unmount();
        document.body.removeChild(toastContainer);
    };
};