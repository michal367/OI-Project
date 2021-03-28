import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';


export interface HeadCell<T> {
    id: keyof T;
    label: string;
    numeric: boolean;
}

export type Order = 'asc' | 'desc';

export interface StudentListHeadProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Student) => void;
    order: Order;
    orderBy: string;
    cells: HeadCell<Student>[];
}

export function StudentListHead(props: StudentListHeadProps) {
    const { order, orderBy, onRequestSort, cells } = props;
    const createSortHandler = (property: keyof Student) => (event: React.MouseEvent<unknown>) => {
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