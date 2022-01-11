const Index = () => {
    const name = "nizamabad"
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=cd8ba3aac0daee3d19f3b1549a2c32e4`
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
    return <div></div>
}


const domContainer = document.querySelector('#root');
ReactDOM.render(<Index />, domContainer);