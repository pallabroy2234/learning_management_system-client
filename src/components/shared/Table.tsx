import {motion} from "framer-motion";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {FC, ReactNode, useState} from "react";
import {FiChevronDown, FiChevronUp, FiDownload, FiPrinter} from "react-icons/fi";
import {CSVLink} from "react-csv";

interface Props {
	data: Array<any>;
	columns: ColumnDef<any>[];
	isHeader?: boolean;
	headerContent?: string;
	isDownload?: boolean;
	placeholder?: string;
	children?: ReactNode;

}

const Table: FC<Props> = ({data, columns, isHeader, isDownload , placeholder="Search..." , headerContent ,children}) => {
	const [globalFilter, setGlobalFilter] = useState("");
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [sorting, setSorting] = useState<SortingState>([]);


	/**
	 * @summary            Table
	 * @description        Table component for displaying users
	 *
	 * */
	const table = useReactTable({
		data,
		columns,
		state: {
			// 	Filter
			globalFilter,
			// 	Pagination
			pagination,
			// 		Sorting
			sorting,
		},
		getCoreRowModel: getCoreRowModel(),

		// Filter | Searching
		manualFiltering: false,
		onGlobalFilterChange: setGlobalFilter,
		getFilteredRowModel: getFilteredRowModel(),

		// 	Pagination
		manualPagination: false,
		onPaginationChange: setPagination,
		getPaginationRowModel: getPaginationRowModel(),

		// 		Sorting
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
	});


	/**
	 * @summary            Initial Animation
	 * */
	// const initialAnimation = {
	// 	initial: {opacity: 0, scale: 0.95, y: 20},
	// 	animate: {
	// 		opacity: 1,
	// 		scale: 1,
	// 		y: 0,
	// 		transition: {
	// 			type: "spring",
	// 			stiffness: 150,
	// 			damping: 15,
	// 			mass: 0.5,
	// 			delay: 0.15,
	// 		},
	// 	},
	// 	exit: {
	// 		opacity: 0,
	// 		scale: 0.95,
	// 		y: -20,
	// 		transition: {duration: 0.2},
	// 	},
	// };


	const initialAnimation = {
		initial: {opacity: 0, y:-15},
		animate: {opacity: 1, y:0},
		exit: {opacity: 0, x: -20},
		}



	return (
		<motion.div {...initialAnimation} className='rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800'>
			{/*	 Table Head */}
			<div className='flex 600px:flex-row flex-col  600px:items-center  justify-between 600px:gap-0 gap-5  p-4 border-b dark:border-gray-700'>
				{isHeader && <h4 className='text-lg font-semibold dark:text-gray-200 text-gray-700'>{headerContent}</h4>}
				{isDownload && (
					<div className='flex space-x-3 600px:order1 order-2'>
						{/* CSV Export */}
						<CSVLink
							data={data}
							filename='courses-export.csv'
							className='flex items-center px-4 py-2 space-x-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'>
							<FiDownload size={16} />
							<span>Export CSV</span>
						</CSVLink>

						{/* Print Button */}
						<button
							onClick={() => window.print()}
							type='button'
							className='flex items-center px-4 py-2 space-x-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'>
							<FiPrinter size={16} />
							<span>Print</span>
						</button>
					</div>
				)}

				{children}

				{/* Search Input */}

				<input
					type='search'
					placeholder={placeholder}
					onChange={(e) => setGlobalFilter(e.target.value)}
					className='px-4 py-1 focus:outline-none border dark:border-slate-500 border-gray-300 rounded  bg-transparent 600px:w-64 w-full dark:text-gray-200 600px:order-2 order-1'
				/>
			</div>

			{/* Table	 */}
			<div className='overflow-x-auto table-scrollbar'>
				<table className='w-full'>
					<thead className='bg-gray-50 dark:bg-gray-700'>
						{table.getHeaderGroups().map((headerGroup: any) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header: any) => (
									<th
										key={header.id}
										className='px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase tracking-wider dark:text-gray-400 whitespace-nowrap'>
										{header.isPlaceholder ? null : (
											<div
												{...{
													className: header.column.getCanSort() ? "cursor-pointer flex items-center " : "",
													onClick: header.column.getToggleSortingHandler(),
												}}>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{
													{
														asc: <FiChevronDown className='ml-1' />,
														desc: <FiChevronUp className='ml-1' />,
													}[(header.column.getIsSorted() as string) ?? null]
												}
											</div>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>

					{/* Table Body  */}
					<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
						{table.getRowModel().rows.map((row: any) => (
							<tr key={row.id} className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								{row.getVisibleCells().map((cell: any) => (
									<td key={cell.id} className='px-6 py-4 whitespace-nowrap'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination button	 */}
			<div className='p-4 flex 500px:flex-row flex-col items-center justify-between 500px:gap-0 gap-5 border-t dark:border-gray-700'>
				<div className='text-sm text-gray-600 dark:text-gray-400 500px:order-1 order-2'>
					Showing {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} Pages (
					{table.getPrePaginationRowModel().rows.length} total entries)
				</div>

				<div className='flex space-x-4 500px:order-2 order-1 self-end'>
					<button
						type='button'
						className={`${!table.getCanPreviousPage() ? "cursor-not-allowed opacity-50" : "opacity-100 cursor-pointer"} px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</button>

					<button
						type='button'
						className={`${!table.getCanNextPage() ? "cursor-not-allowed opacity-50" : "opacity-100 cursor-pointer"} px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</button>
				</div>
			</div>
		</motion.div>
	);
};
export default Table;
