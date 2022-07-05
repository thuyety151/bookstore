import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ExcelStyle } from "ag-grid-community";

const ExportSample = () => {
  const gridRef = useRef<any>();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowData, setRowData] = useState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [columnDefs, setColumnDefs] = useState<any>([
    {
      children: [
        {
          field: "athlete",
          minWidth: 200,
          backgroundColor: "red",
          color: "#fff",
        },
        {
          field: "age",
          cellClass: "twoDecimalPlaces",
          cellClassRules: {
            greenBackground: function (params: any) {
              return params.value < 23;
            },
            redFont: function (params: any) {
              return params.value < 20;
            },
          },
        },
        {
          field: "country",
          minWidth: 200,
          cellClassRules: {
            redFont: function (params: any) {
              return params.value === "United States";
            },
          },
        },
        {
          headerName: "Group",
          valueGetter: "data.country.charAt(0)",
          cellClassRules: {
            boldBorders: function (params: any) {
              return params.value === "U";
            },
          },
          cellClass: ["redFont", "greenBackground"],
        },
        {
          field: "year",
          cellClassRules: {
            notInExcel: function (params: any) {
              return true;
            },
          },
        },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      cellClassRules: {
        darkGreyBackground: function (params: any) {
          return (params.node.rowIndex || 0) % 2 === 0;
        },
      },
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
      skipColumnGroupHeaders: true,
    };
  }, []);
  const pinnedTopRowData = useMemo(() => {
    return [
      {
        athlete: "Floating <Top> Athlete",
        age: 999,
        country: "Floating <Top> Country",
        year: 2020,
        date: "2020-08-01",
        sport: "Track & Field",
        gold: 22,
        silver: "003",
        bronze: 44,
        total: 55,
      },
    ];
  }, []);
  const pinnedBottomRowData = useMemo(() => {
    return [
      {
        athlete: "Floating <Bottom> Athlete",
        age: 888,
        country: "Floating <Bottom> Country",
        year: 2030,
        date: "2030-08-01",
        sport: "Track & Field",
        gold: 222,
        silver: "005",
        bronze: 244,
        total: 255,
      },
    ];
  }, []);
  const excelStyles = useMemo(() => {
    return [
      {
        id: "cell",
        alignment: {
          vertical: "Center",
        },
      },
      {
        id: "header",
        alignment: {
          vertical: "Center",
        },
        interior: {
          color: "#f8f8f8",
          pattern: "Solid",
          patternColor: undefined,
        },
        borders: {
          borderBottom: {
            color: "#babfc7",
            lineStyle: "Continuous",
            weight: 1,
          },
        },
      },
      {
        id: "headerGroup",
        font: {
          bold: true,
        },
      },
      {
        id: "greenBackground",
        interior: {
          color: "#b5e6b5",
          pattern: "Solid",
        },
      },
      {
        id: "redFont",
        font: {
          fontName: "Calibri Light",
          underline: "Single",
          italic: true,
          color: "#ff0000",
        },
      },
      {
        id: "darkGreyBackground",
        interior: {
          color: "#888888",
          pattern: "Solid",
        },
        font: {
          fontName: "Calibri Light",
          color: "#ffffff",
        },
      },
      {
        id: "boldBorders",
        borders: {
          borderBottom: {
            color: "#000000",
            lineStyle: "Continuous",
            weight: 3,
          },
          borderLeft: {
            color: "#000000",
            lineStyle: "Continuous",
            weight: 3,
          },
          borderRight: {
            color: "#000000",
            lineStyle: "Continuous",
            weight: 3,
          },
          borderTop: {
            color: "#000000",
            lineStyle: "Continuous",
            weight: 3,
          },
        },
      },
      {
        id: "dateFormat",
        dataType: "DateTime",
        numberFormat: {
          format: "mm/dd/yyyy;@",
        },
      },
      {
        id: "twoDecimalPlaces",
        numberFormat: {
          format: "#,##0.00",
        },
      },
      {
        id: "textFormat",
        dataType: "String",
      },
    ] as ExcelStyle[];
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json").then(
      (resp) => resp.json()
    );
  }, []);

  const onBtExport = useCallback(() => {
    var params = {
      fontSize: 14,
      rowHeight: 28,
      headerRowHeight: 28,
    };
    gridRef.current.api.exportDataAsExcel(params);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="columns">
          <div className="option">
            <label htmlFor="fontSize">
              <input type="checkbox" id="fontSize" />
              Font Size =
            </label>
            <input
              type="text"
              id="fontSizeValue"
              value="14"
              style={{ width: "40px" }}
            />
          </div>
          <div className="option">
            <label htmlFor="rowHeight">
              <input type="checkbox" id="rowHeight" />
              Row Height =
            </label>
            <input
              type="text"
              id="rowHeightValue"
              value="30"
              style={{ width: "40px" }}
            />
          </div>
          <div className="option">
            <label htmlFor="headerRowHeight">
              <input type="checkbox" id="headerRowHeight" />
              Header Row Height =
            </label>
            <input
              type="text"
              id="headerRowHeightValue"
              value="30"
              style={{ width: "40px" }}
            />
          </div>
        </div>
        <div>
          <label>
            <button
              onClick={onBtExport}
              style={{ marginBottom: "5px", fontWeight: "bold" }}
            >
              Export to Excel
            </button>
          </label>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pinnedTopRowData={pinnedTopRowData}
              pinnedBottomRowData={pinnedBottomRowData}
              excelStyles={excelStyles}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportSample;
