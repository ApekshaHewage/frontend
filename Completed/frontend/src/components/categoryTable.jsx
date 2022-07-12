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
import useCatogaries from "../query-hooks/usecategories";
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

export const CategoryDetails = () => {
  const items = useCatogaries();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
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
                      {item?.description}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <IconButton size="small">
                        <EditIcon fontSize="small" style={{ color: "green" }} />
                      </IconButton>

                      <IconButton size="small">
                        <DeleteIcon
                          fontSize="small"
                          style={{ color: "red" }}
                          //onClick={() => deleteEvent(item?.id)}
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
