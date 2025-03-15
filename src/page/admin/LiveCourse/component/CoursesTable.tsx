import {FC, useMemo, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {CSVLink} from "react-csv";
import {FiChevronDown, FiDownload, FiEdit, FiPrinter, FiTrash2} from "react-icons/fi";
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

interface Props {
	data: Array<any>;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
}

interface Course {
	_id: string;
	name: string;
	description: string;
	price: number;
	level: string;
	createdAt: string;
	rating: number;
	purchased: number;
	thumbnail: {
		url: string;
	};
}

const CoursesTable: FC<Props> = ({data, onEdit, onDelete}) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [globalFilter, setGlobalFilter] = useState("");

	const truncate = (text: string, length: number) => {
		return text.length > length ? text.substring(0, length) + "..." : text;
	};

	const columns = useMemo<ColumnDef<Course>[]>(
		() => [
			// {
			// 	id: "Select",
			// 	header: ({table})=> (
			// 		<input type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllPageRowsSelectedHandler()}  className="form-checkbox h-4 w-4 rounded text-purple-600 transition focus:ring-purple-500 dark:bg-gray-700"/>
			// 	),
			// 	cell: ({row})=> (
			// 		<input
			// 			checked={row.getIsSelected()}
			// 			onChange={row.getToggleSelectedHandler()}
			// 			type="checkbox"
			// 			className="form-checkbox h-4 w-4 rounded text-purple-500 transition focus:ring-purple-500 dark:bg-gray-700"
			// 		/>
			// 	)
			// },
			{
				accessorKey: "_id",
				header: "ID",
			},
			{
				accessorKey: "thumbnail",
				header: "Thumbnail",
				cell: ({row}) => (
					<div className=''>
						<img src={row.original.thumbnail.url} alt={row.original.name} className='w-[120px] h-[50px] ' />
					</div>
				),
			},
			{
				accessorKey: "name",
				header: "Course Name",
				cell: ({getValue}) => <span className='font-medium text-gray-800 dark:text-gray-200'>{truncate(getValue<string>(), 50)}</span>,
			},
			{
				accessorKey: "description",
				header: "Description",
				cell: ({getValue}) => <span className='max-w-xs  text-gray-600 dark:text-gray-400'>{truncate(getValue<string>(), 30)}</span>,
			},
			{
				accessorKey: "price",
				header: "Price",
				cell: ({getValue}) => `$${getValue<number>().toLocaleString()}`,
			},
			{
				accessorKey: "level",
				header: "Level",
				cell: ({getValue}) => (
					<span className='inline-block rounded-full bg-purple-500 px-3 py-1 text-sm text-white dark:bg-purple-900/30 dark:text-purple-400'>
						{getValue<string>()}
					</span>
				),
			},
			{
				accessorKey: "createdAt",
				header: "Created Data",
				cell: ({getValue}) => new Date(getValue<string>()).toLocaleDateString(),
			},
			{
				accessorKey: "rating",
				header: "Rating",
				cell: ({getValue}) => (
					<div className='flex items-center'>
						<span className='mr-2 text-yellow-500'>★</span>
						{getValue<number>()}
					</div>
				),
			},
			{
				accessorKey: "purchased",
				header: "Purchased",
			},
			{
				id: "Actions",
				header: "Actions",
				cell: () => (
					<div className='flex space-x-3'>
						<motion.button
							whileHover={{scale: 1.05}}
							whileTap={{scale: 0.95}}
							className='text-blue-500 hover:text-blue-600 dark:text-blue-400'>
							<FiEdit size={18} />
						</motion.button>

						<motion.button
							whileHover={{scale: 1.05}}
							whileTap={{scale: 0.95}}
							className='text-red-500 hover:text-red-600 dark:text-red-400'>
							<FiTrash2 size={18} />
						</motion.button>
					</div>
				),
			},
		],
		[onEdit, onDelete],
	);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			rowSelection,
			pagination,
			globalFilter,
		},
		// Pagination

		manualPagination: false,
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		// Sorting
		onSortingChange: setSorting,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		// 	search options
		manualFiltering: false,
		onGlobalFilterChange: setGlobalFilter,
		getFilteredRowModel: getFilteredRowModel(),
	});

	/**
	 * @summary         Animation
	 * */

	const initialAnimation = {
		initial: { opacity: 0, scale: 0.95, y: 20 },
		animate: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 150,
				damping: 15,
				mass: 0.5,
				delay: 0.15
			}
		},
		exit: {
			opacity: 0,
			scale: 0.95,
			y: -20,
			transition: { duration: 0.2 }
		}
	};

	return (
		<motion.div {...initialAnimation} className='rounded-xl border bg-white border-gray-200 shadow dark:bg-slate-800 dark:border-slate-700'>
			{/*	Table Actions */}
			<div className='flex 600px:flex-row 600px:items-center 600px:justify-between flex-col gap-6 600px:gap-0 p-4 border-b dark:border-gray-700 '>
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
				<input
					value={globalFilter}
					onChange={(e) => setGlobalFilter(e.target.value)}
					type='search'
					placeholder='Search courses...'
					className='px-4 py-[8px] border focus:outline-none rounded-lg 600px:w-64 w-full border-gray-300 bg-transparent dark:border-gray-500 600px:order-2 order-1'
				/>
			</div>

			{/* Table  */}
			<div className='overflow-x-auto table-scrollbar'>
				<table className='w-full'>
					{/* Table Header */}
					<thead className='bg-gray-50 dark:bg-gray-700'>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 whitespace-nowrap'>
										{header.isPlaceholder ? null : (
											<div
												{...{
													className: header.column.getCanSort() ? "cursor-pointer flex items-center" : "",
													onClick: header.column.getToggleSortingHandler(),
												}}>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{{
													asc: <FiChevronDown className='ml-1' />,
													desc: <FiChevronDown className='ml-1' />,
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					{/* Table Body	 */}

					<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
					<AnimatePresence>
						{table.getRowModel().rows.map((row) => (
							<motion.tr
								key={row.id}
								// initial={{ opacity: 0, y: 20 }}
								// animate={{
								// 	opacity: 1,
								// 	y: 0,
								// 	transition: {
								// 		delay: index * 0.1, // প্রতিটি row এর জন্য ডেলি
								//
								// 	}
								// }}
								// exit={{ opacity: 0, x: -50 }}
								className='hover:bg-gray-50 dark:hover:bg-gray-700/50'
							>
								{row.getVisibleCells().map((cell) => (
									<motion.td
										key={cell.id}
										className='px-6 py-4 whitespace-nowrap'
										// initial={{ scale: 0.9 }}
										// animate={{ scale: 1 }}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</motion.td>
								))}
							</motion.tr>
						))}
					</AnimatePresence>
					</tbody>
					{/*<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>*/}
					{/*	{table.getRowModel().rows.map((row) => (*/}
					{/*		<motion.tr*/}
					{/*			key={row.id}*/}
					{/*			initial={{opacity: 0}}*/}
					{/*			animate={{opacity: 1}}*/}
					{/*			exit={{opacity: 0}}*/}

					{/*			className='hover:bg-gray-50  dark:hover:bg-gray-700/50'>*/}
					{/*			{row.getVisibleCells().map((cell) => (*/}
					{/*				<td key={cell.id} className='px-6  py-4 whitespace-nowrap '>*/}
					{/*					{flexRender(cell.column.columnDef.cell, cell.getContext())}*/}
					{/*				</td>*/}
					{/*			))}*/}
					{/*		</motion.tr>*/}
					{/*	))}*/}
					{/*</tbody>*/}
				</table>
			</div>

			{/*	Pagination and Row Count  */}
			<div className='p-4 flex items-center justify-between border-t dark:border-gray-700'>
				<div className='text-sm text-gray-600 dark:text-gray-400'>
					{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) Selected
				</div>
				<div className='flex space-x-4'>
					<button
						type='button'
						className='px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</button>
					<button
						type='button'
						className='px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</button>
				</div>
			</div>
		</motion.div>
	);
};
export default CoursesTable;
