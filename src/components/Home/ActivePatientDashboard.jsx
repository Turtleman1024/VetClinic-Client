import { useEffect, useState } from 'react';
import { Stack, Text } from '@fluentui/react';
import { DetailsList, DetailsListLayoutMode, SelectionMode, DetailsRow } from '@fluentui/react/lib/DetailsList';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions/patients';

const ActivePatientDashboard = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.vetClinic.patients) || [];
  const [sortedItems, setSortedItems] = useState([]);
  const [sortColumn, setSortColumn] = useState('');
  const [isSortedDescending, setIsSortedDescending] = useState(false);

  useEffect(() => {
    dispatch(actions.fetchActivePatients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSortedItems(patients);
  }, [patients]);

  const onColumnClick = (ev, column) => {
    const newIsSortedDescending = column.key === sortColumn ? !isSortedDescending : false;
    const sortedItems = [...patients].sort((a, b) => {
      if (a[column.fieldName] < b[column.fieldName]) {
        return newIsSortedDescending ? 1 : -1;
      }
      if (a[column.fieldName] > b[column.fieldName]) {
        return newIsSortedDescending ? -1 : 1;
      }
      return 0;
    });

    setSortColumn(column.key);
    setIsSortedDescending(newIsSortedDescending);
    setSortedItems(sortedItems);
  };

  const columns = [
    {
      key: 'patientId',
      name: 'Id',
      fieldName: 'patientId',
      minWidth: 50,
      maxWidth: 100,
      isRowHeader: true,
      isResizable: true,
      isSorted: sortColumn === 'patientId',
      isSortedDescending: sortColumn === 'patientId' && isSortedDescending,
      sortAscendingAriaLabel: 'Sorted by ID ascending',
      sortDescendingAriaLabel: 'Sorted by ID descending',
      onColumnClick: onColumnClick,
      onRender: (item) => (
        <Link to={`/owner/${item.ownerId}/patient/${item.patientId}`}>
          {item.patientId}
        </Link>
      ),
    },
    {
      key: 'patientName',
      name: 'Patient Name',
      fieldName: 'patientName',
      minWidth: 100,
      maxWidth: 200,
      isResizable: false,
      isSorted: sortColumn === 'patientName',
      isSortedDescending: sortColumn === 'patientName' && isSortedDescending,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      onColumnClick: onColumnClick,
    },
    {
      key: 'patientSpecies',
      name: 'Patient Species',
      fieldName: 'patientSpecies',
      minWidth: 100,
      maxWidth: 200,
      isResizable: false,
      isSorted: sortColumn === 'patientSpecies',
      isSortedDescending: sortColumn === 'patientSpecies' && isSortedDescending,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      onColumnClick: onColumnClick,
    },
    {
      key: 'patientGender',
      name: 'Patient Gender',
      fieldName: 'patientGender',
      minWidth: 100,
      maxWidth: 200,
      isResizable: false,
      isSorted: sortColumn === 'patientGender',
      isSortedDescending: sortColumn === 'patientGender' && isSortedDescending,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      onColumnClick: onColumnClick,
    },
  ];

  const detailsListStyles = {
    root: {
      selectors: {
        '& .ms-DetailsHeader': {
          backgroundColor: '#0984e3',
        },
        '& .ms-DetailsHeader-cell': {
          padding: '8px 16px',
        },
        '& .ms-DetailsHeader-cellTitle': {
          fontSize: '16px', // Increase sorting arrow size
          selectors: {
            ':hover': {
              color: 'inherit', // Turn off hover color change
              backgroundColor: '#0984e3',
            },
          },
        },
        '& .ms-DetailsHeader-cellName': {
          fontSize: '16px', // Increase font size for header text
        },
        '& .ms-DetailsRow': {
          border: '1px solid #dee2e6',
        },
        '& .ms-DetailsRow-cell': {
          padding: '12px',
          fontSize: '16px',
        },
      },
    },
  };
  
  const onRenderRow = (props) => {
    const customStyles = {
      root: {
        backgroundColor: props.itemIndex % 2 === 0 ? '#f3f3f3' : 'white',
      },
    };
    return <DetailsRow {...props} styles={customStyles} />;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Stack tokens={{ childrenGap: 20, padding: 20 }} className='p-3 my-3'>
        <Text variant='xxLarge'>Active Patients</Text>
        <DetailsList
          items={sortedItems}
          columns={columns}
          setKey='set'
          layoutMode={DetailsListLayoutMode.fixedColumns}
          selectionMode={SelectionMode.none}
          styles={detailsListStyles}
          isHeaderVisible={true}
          isMultiline={false}
          onRenderRow={onRenderRow}
        />
      </Stack>
    </div>
  );
};

ActivePatientDashboard.propTypes = {};

export default ActivePatientDashboard;