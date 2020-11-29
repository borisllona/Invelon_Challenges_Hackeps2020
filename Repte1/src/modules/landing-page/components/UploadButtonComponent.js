const UploadButtonComponent = (props) => {

    return (
        <div>
            <p>
            <input type="file" onChange={props.onChange} />
            </p>
            <button onClick={props.onClick}>
                Upload
            </button>
        </div>
    );
};

export default UploadButtonComponent;