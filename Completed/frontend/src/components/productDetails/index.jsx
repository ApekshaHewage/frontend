import {
  Table,
  TableBody,
  TableHead,
  IconButton,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
} from "@material-ui/core";
import useItems from "../../query-hooks/useItems";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const deleteEvent = (id) => {
  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  fetch(`http://localhost:4000/item/delete/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      alert(JSON.stringify(result));
    })
    .catch((error) => console.log("error", error));
};

export const ProductDetails = () => {
  const items = useItems();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock </TableCell>
            <TableCell>Reorder Level</TableCell>
            <TableCell>Description</TableCell>
            <TableCell> Discount </TableCell>
            <TableCell> Category </TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.isLoading && <p>Loading items...</p>}
          {items.isError && <p>Could not fetch items ...</p>}

          {items.isSuccess && (
            <>
              {items.data.map((item) => (
                <>
                  <TableRow key={item?.id}>
                    <TableCell component="th" scope="row">
                      {item?.title}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item?.price}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item?.stock}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item?.reorder_level}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item?.description}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item?.discount}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {item?.catogary}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <IconButton size="small">
                        <EditIcon fontSize="small" style={{ color: "green" }} />
                      </IconButton>

                      <IconButton size="small">
                        <DeleteIcon
                          fontSize="small"
                          style={{ color: "red" }}
                          onClick={() => deleteEvent(item?.id)}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
