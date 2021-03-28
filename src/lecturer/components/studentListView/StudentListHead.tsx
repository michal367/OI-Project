/* Code adopted from: https://material-ui.com/components/tables/ */

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Order } from '../../util/comparators';
import { StudentListRow } from './StudentListView';


export interface HeadCell<T> {
    id: keyof T;
    label: string;
    numeric: boolean;
}

export interface StudentListHeadProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof StudentListRow) => void;
    order: Order;
    orderBy: string;
    cells: HeadCell<StudentListRow>[];
}

export function StudentListHead(props: StudentListHeadProps) {
    const { order, orderBy, onRequestSort, cells } = props;
    const createSortHandler = (property: keyof StudentListRow) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {cells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span hidden={true}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead >
    );
}