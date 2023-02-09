import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from "moment";
import "moment/locale/es-do";
import { Empty, Breadcrumb, Table } from 'antd';

export const descargarExcel = (informacionFiltrada, datos, nombretabla, nombrearchivo) => {

    const filteredData = datos.filter(record => {
        let isFiltered = true;
        for (let key in informacionFiltrada) {
            if (informacionFiltrada[key] !== null) {
                isFiltered = isFiltered && record[key].includes(informacionFiltrada[key]);
            }
        }
        return isFiltered;
    });
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(filteredData)
    XLSX.utils.book_append_sheet(workBook, workSheet, nombretabla)
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    //Download
    XLSX.writeFile(workBook, nombrearchivo)
}

export const descargarPDF = (informacionFiltrada, datos, columnas, nombretabla, nombrearchivo) => {

    const orientation = "landscape"; // portrait or landscape
    const doc = new jsPDF(orientation);
    const filteredData = datos.filter(record => {
        let isFiltered = true;
        for (let key in informacionFiltrada) {
            if (informacionFiltrada[key] !== null) {
                isFiltered = isFiltered && record[key].includes(informacionFiltrada[key]);
            }
        }
        return isFiltered;
    });

    var today = moment().format("dddd, MMMM D YYYY");

    doc.text(nombretabla + " - crudAPP™", 20, 10);

    doc.autoTable({
        startY: 20,
        theme: "grid",
        columns: columnas.map((col) => ({ ...col, dataKey: col.field })),
        body: filteredData.map(data => data),
        didDrawPage: function (data) {
            doc.text("Página " + data.pageCount, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 20);
        },
    });

    doc.text("Fecha: " + today, 10, doc.internal.pageSize.height - 20);

    doc.save(nombrearchivo);
};

export const eliminarPropiedadesVacias = (obj) =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v?.toString().length > 0));

export function tablaVaciaPersonalizada() {
    return (
        <Empty
            description="No hay datos disponibles"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
    );
}

export function migajaDePan(elemento1, elemento2) {
    return (
        <Breadcrumb>
            <Breadcrumb.Item>{elemento1}</Breadcrumb.Item>
            <Breadcrumb.Item>{elemento2}</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export function TablaAntDesign(columnas, datos, manejadorDeCambios, claveDeFila) {
    return (
        <Table
            columns={columnas}
            scroll={{ x: 2000, y: 500 }}
            dataSource={datos}
            locale={{ emptyText: tablaVaciaPersonalizada }}
            onChange={manejadorDeCambios}
            pagination={{
                defaultPageSize: 20,
                pageSizeOptions: ['20', '40', '60', '80', '100'],
                showSizeChanger: true,
                locale: {
                    items_per_page: '/ página',
                    prev_page: 'Anterior',
                    next_page: 'Siguiente',
                },
            }}
            bordered
            rowKey={claveDeFila}
            loading={false}
        />
    );
}