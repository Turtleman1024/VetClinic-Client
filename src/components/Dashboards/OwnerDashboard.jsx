import { useState, useEffect } from 'react';
import { Stack, Text } from '@fluentui/react';
import { DetailsList, DetailsListLayoutMode, SelectionMode, DetailsRow } from '@fluentui/react/lib/DetailsList';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions/owners';

const OwnerDashboard = () => {
  const dispatch = useDispatch();
  const owners = useSelector((state) => state.vetClinic.owners) || [];
  const [sortedItems, setSortedItems] = useState([]);
  const [sortColumn, setSortColumn] = useState('');
  const [isSortedDescending, setIsSortedDescending] = useState(false);

  useEffect(() => {
    dispatch(actions.fetchOwners());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
    useEffect(() => {
      setSortedItems(owners);
    }, [owners]);
  
    const onColumnClick = (ev, column) => {
      const newIsSortedDescending = column.key === sortColumn ? !isSortedDescending : false;
      const sortedItems = [...owners].sort((a, b) => {
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
      key: 'ownerId',
      name: 'Id',
      fieldName: 'ownerId',
      minWidth: 50,
      maxWidth: 100,
      isRowHeader: true,
      isResizable: true,
      isSorted: sortColumn === 'ownerId',
      isSortedDescending: sortColumn === 'ownerId' && isSortedDescending,
      sortAscendingAriaLabel: 'Sorted by ID ascending',
      sortDescendingAriaLabel: 'Sorted by ID descending',
      onColumnClick: onColumnClick,
      onRender: (item) => (
        <Link to={`/owner/${item.ownerId}`}>
          {item.ownerId}
        </Link>
      ),
    },
    {
      key: 'ownerFirstName',
      name: 'First Name',
      fieldName: 'ownerFirstName',
      minWidth: 100,
      maxWidth: 200,
      isResizable: false,
      isSorted: sortColumn === 'ownerFirstName',
      isSortedDescending: sortColumn === 'ownerFirstName' && isSortedDescending,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      onColumnClick: onColumnClick,
    },
    {
      key: 'ownerLastName',
      name: 'Last Name',
      fieldName: 'ownerLastName',
      minWidth: 100,
      maxWidth: 200,
      isResizable: false,
      isSorted: sortColumn === 'ownerLastName',
      isSortedDescending: sortColumn === 'ownerLastName' && isSortedDescending,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      onColumnClick: onColumnClick,
    },
    {
      key: 'column4',
      name: 'Phone',
      fieldName: 'ownerPhone',
      minWidth: 100,
      maxWidth: 200,
      isResizable: false,
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
          selectors: {
            ':hover': {
              backgroundColor: '#0984e3', // Ensure background color remains the same on hover
              color: 'inherit', // Turn off hover color change
            },
          },
        },
        '& .ms-DetailsHeader-cellTitle': {
          fontSize: '16px', // Increase sorting arrow size
        },
        '& .ms-DetailsHeader-cellName': {
          fontSize: '16px', // Increase font size for header text
        },
        '& .ms-DetailsRow': {
          borderBottom: '1px solid #dee2e6',
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
        <Text variant='xxLarge'>Owners</Text>
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

OwnerDashboard.propTypes = {};

export default OwnerDashboard;