import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToastData, setModalData } from '../../store/action/actions';
import {
  ButtonComponent as Button,
  TableComponent as Table,
	LoadingPageComponent as Loading,
} from '../../components/common';
import { RootState } from '../../store/store';
import { configUrl, renderActiveChip, renderIconActions, toHoverStyle } from '../../components/utils';

const tableFieldData = [
  { text: 'Nombre', width: 2, name: 'name' },
  { text: 'Estado', width: 1, name: 'active' },
  { text: 'Acciones', width: 1, name: 'actions' },
];

const url: RequestInfo = `${configUrl}/categories`

const CategoryView: React.FC = () => {
	const [tableData, setTableData] = useState<ICategoryData[]>([])
	const [show, setShow] = useState<boolean>(false)

	const dispatch = useDispatch()
	const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

	useEffect(() => {
		getCategories()
    //eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (tableData.length === 0) return;

		setShow(true)
	}, [tableData])

	const getCategories = async () => {
		const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(url, requestInit);
		if (res.ok) {
      let { name: role } = userData.role
      let showActions = {
				edit: false,
				delete: false,
				order: false,
				more: false,
			}
      if (role === "Administrador") {
        showActions = {
          edit: true,
          delete: true,
          order: false,
          more: false,
        }
      }

			const data: ICategory[] = await res.json();
			let newTableData: ICategoryData[] = data.map(({_id, name, active}) => {
				let newData: ICategoryData = {
					_id,
					name,
					active: renderActiveChip(active),
					actions: renderIconActions(_id, 'category', showAlert, showActions)
				}
				return newData
			})
			setTableData(newTableData);
		} else {
			dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Create, Error${res.status} : ${res.statusText}`,
        color: 'S',
        delay: 5
      }))
		}
	}

	const deleteCategory = async(idCat: string) => {
		const urlDelete: RequestInfo = url + '/' + idCat;
    const requestInit: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlDelete, requestInit);
    const data = await res.json();
    console.log('Category Deleted', data);
    getCategories();
    dispatch(setModalData({setisOpen: (prev => !prev)}))
    showAlert('toast')
	}

	const showAlert = (type: string, id?: string) => {
    if (type === 'toast') {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El producto ha sido eliminado con exito.',
        color: 'success',
        delay: 5
      }))
    }
    else {
      dispatch(setModalData({
        isOpen: true,
        setisOpen: (prev => !prev),
        title: '¿Esta seguro que desea eliminar el elemento?',
        contentText: 'El elemento seleccionado sera eliminado de la base de datos',
        cancelButton: true,
        typeButton: 'Si, Eliminalo',
        colorTYB: 'danger',
        onClickTYB: () => deleteCategory(id!)
      }))
    }
  }

	return show ? (<>
		<div className="container mx-auto">
			<div className="w-full lg:w-10/12 mx-auto my-8">
				<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
					<div className="rounded-lg bg-white mb-0 px-6 py-3">
						<div className="flex items-center justify-between">
							<h6 className="text-gray-500 text-2xl font-semibold tracking-normal">
								Categorías
							</h6>
							{ userData.role.name === "Administrador" &&
								<Link to={`/category/form`}>
									<Button
										label="Agregar"
										textColor="white"
										bgColor="bg-gradient-to-r from-green-400 to-green-500"
										onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
									/>
								</Link>
							}
						</div>
					</div>

					<div className="mb-3 mx-72">
						<Table theadData={tableFieldData} tbodyData={tableData} />
					</div>
				</div>
			</div>
		</div>
	</>) : <Loading />
}

export default CategoryView
