const List = (props) => {
    console.log(props)
    return (
        <li style={{listStyle:'none'}}>
            {props.tech}
        </li>
    )
}

export default List