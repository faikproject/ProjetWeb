function Alert(props) {
    const type = props.type || 'blue';
    return <div className={`m-0 mb-4 bg-${type}-100 text-${type}-500 text-sm border border-${type}-600 p-2 rounded`}>{props.message || props.children}</div>;
}

export default Alert;