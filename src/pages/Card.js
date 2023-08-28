import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledImageForProduct } from './Style';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCard } from '../actions/AddToCardAction';
import { useSelector } from 'react-redux';

export default function Card({ userListInfo }) {
  const dispatch = useDispatch();
  const params = useParams();
  let productId = params.productId;
  const cardItems = useSelector((state) => state.addToCardReducer);
  console.log('cardItems', cardItems);

  const columns = [
    { id: 'image', label: 'Image', minWidth: 100, align: 'center' },
    { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
    { id: 'price', label: 'Price', minWidth: 100, align: 'center' },
    {
      id: 'quantity',
      label: 'Quantity',
      minWidth: 100,
      align: 'center'
    }
  ];

  // temporory data

  const data = [
    {
      image: '64d3a9747b50b5f0c64e9602',
      name: '----',
      price: '---',
      quantity: 2
    }
  ];

  useEffect(() => {
    dispatch(addToCard(productId));
  }, []);

  return (
    <Paper sx={{ width: '70%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 360 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'black' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userListInfo
              ? userListInfo?.map((item, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.email}</TableCell>
                      <TableCell align="center">{item?.role}</TableCell>
                      <TableCell align="center">{item?.createdAt}</TableCell>
                    </TableRow>
                  );
                })
              : data?.map((item, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell align="center">
                        <StyledImageForProduct
                          src={`http://localhost:8000/api/product/photo/${item?.image}`}
                          alt="Product Image"
                          height="30px"
                          width=" 30px"
                        />
                      </TableCell>
                      <TableCell align="center">{item?.name}</TableCell>
                      <TableCell align="center">{item?.price}</TableCell>
                      <TableCell align="center">{item?.quantity}</TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
