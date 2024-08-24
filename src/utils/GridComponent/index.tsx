import { Sheet, Table } from "@mui/joy";
import { ReactElement } from "react";

function GridComponent({
  headers,
  gridData,
  withBorder = true,
}: {
  headers?: ReactElement;
  gridData: ReactElement;
  withBorder?: boolean;
}) {
  const TableComponent = () => {
    return (
      <Table
        aria-labelledby="tableTitle"
        stickyHeader
        hoverRow
        sx={{
          "--TableCell-headBackground": "var(--joy-palette-background-level1)",
          "--Table-headerUnderlineThickness": "1px",
          "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
          "--TableCell-paddingY": "4px",
          "--TableCell-paddingX": "8px",
        }}
      >
        {headers && <thead>{headers}</thead>}
        <tbody>{gridData}</tbody>
      </Table>
    );
  };

  return withBorder ? (
    <Sheet
      className="OrderTableContainer"
      variant="outlined"
      sx={{
        display: { xs: "none", sm: "initial" },
        width: "100%",
        borderRadius: "sm",
        flexShrink: 1,
        overflow: "auto",
        minHeight: 0,
        alignSelf: "center",
      }}
    >
      <TableComponent />
    </Sheet>
  ) : (
    <TableComponent />
  );
}

export default GridComponent;
