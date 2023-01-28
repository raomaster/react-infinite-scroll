export const DataRow = ({ data }) => {
  console.log(data)
  return (
    <>
      {
        data.map((element) => (
          <tr key={element.id}>
            <td>{element.firstName}</td>
            <td>{element.lastName}</td>
            <td><img src={element.image} alt={`Image of the user: ${element.image}`} /></td>
          </tr>
        ))
      }
    </>

  )
}

export default DataRow
