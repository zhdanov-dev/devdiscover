import Head from './head/Head';
import Instance from './instance/Instance';
import stl from './Table.module.scss';

interface TableProps {
	values: any;
	param: string;
}

function Table({ values, param }: TableProps) {
	return (
		<div className={stl.table}>
			{param === '01010000' && (
				<>
					<Head values={['id', 'title', 'type', 'status', 'project']} />
					<div className={stl.content}>
						{values.map((value: any, index: number) => {
							return (
								<Instance
									values={[
										value.id,
										value.title,
										value.type,
										value.status,
										value.project.slug,
									]}
									key={index}
								/>
							);
						})}
					</div>
				</>
			)}
			{(param === '11000000' || param === '10110000') && (
				<>
					<Head values={['id', 'type', 'title']} />
					<div className={stl.content}>
						{values.map((value: any, index: number) => {
							return (
								<Instance
									values={[value.id, value.title, value['event.type']]}
									key={index}
								/>
							);
						})}
					</div>
				</>
			)}
			{/* {param === '00110010' && (
				<>
					<Head values={['key', 'value']} />
					<div className={stl.content}>
						<Instance values={[values.key, values.topValues[0].value]} />
					</div>
				</>
			)}
			{param === '11100000' && (
				<>
					<Head values={['id', 'title', 'type', 'errors']} />
					<div className={stl.content}>
						<Instance
							values={[
								values.id,
								values.title,
								values.type,
								values.errors.length,
							]}
						/>
					</div>
				</>
			)} */}
		</div>
	);
}

export default Table;
