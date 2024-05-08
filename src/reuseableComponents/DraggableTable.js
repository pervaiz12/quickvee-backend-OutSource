import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SortIcon from "../Assests/Category/Sorting.svg";
import ViewItemsModal from "../Components/Category/ViewItemsModal";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DraggableTable = ({
  tableHead,
  tableRow,
  setFunction,
  viewSelectedOption = false,
  
  handleViewItemsClick,
}) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // Check if the drag ended outside of the droppable area
    if (!result.destination) {
      alert("You can't drop outside the list!");
      return;
    }

    // Check if the item was dropped at the same position
    if (result.destination.index === result.source.index) {
      alert("You haven't moved the item!");
      return;
    }

    const reorderedItems = reorder(
      tableRow,
      result.source.index,
      result.destination.index
    );

    setFunction(reorderedItems);

    alert("Are you sure you want to sort item!");
    //console.log(result);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              {tableHead.map((item, index) => (
                <StyledTableCell>{item}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                  {tableRow &&
                    tableRow.length >= 1 &&
                    tableRow.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <StyledTableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <StyledTableCell>
                              <img src={SortIcon} alt="add-icon" />
                            </StyledTableCell>
                            <StyledTableCell>{item.title}</StyledTableCell>
                            {}
                            <StyledTableCell>
                              <ViewItemsModal
                                selectedView={item}
                                onViewClick={handleViewItemsClick}
                              />
                            </StyledTableCell>
                          </StyledTableRow>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableContainer>
    </>
  );
};

export default DraggableTable;
