'use client'
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
// } from '@chakra-ui/react'
// const Finance = () => {
//   return <div className='bg-white text-black dark:text-white dark:bg-dark'>
//   <TableContainer>
//   <Table variant='simple'>
//     <TableCaption>Imperial to metric conversion factors</TableCaption>
//     <Thead>
//       <Tr>
//         <Th>To convert</Th>
//         <Th>into</Th>
//         <Th isNumeric>multiply by</Th>
//       </Tr>
//     </Thead>
//     <Tbody>
//       <Tr>
//         <Td>inches</Td>
//         <Td>millimetres (mm)</Td>
//         <Td isNumeric>25.4</Td>
//       </Tr>
//       <Tr>
//         <Td>feet</Td>
//         <Td>centimetres (cm)</Td>
//         <Td isNumeric>30.48</Td>
//       </Tr>
//       <Tr>
//         <Td>yards</Td>
//         <Td>metres (m)</Td>
//         <Td isNumeric>0.91444</Td>
//       </Tr>
//     </Tbody>
//     <Tfoot>
//       <Tr>
//         <Th>To convert</Th>
//         <Th>into</Th>
//         <Th isNumeric>multiply by</Th>
//       </Tr>
//     </Tfoot>
//   </Table>
// </TableContainer>
//   </div>
// }

// export default Finance;


// FinanceComponent.tsx

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

// ConversionFactor component
const ConversionFactor = ({ from, to, factor }: { from: string; to: string; factor: number }) => (
  <Tr>
    <Td>{from}</Td>
    <Td>{to}</Td>
    <Td isNumeric>{factor}</Td>
  </Tr>
);

// FinanceTable component
const FinanceTable = ({ caption="", factors }: { caption: string; factors: { from: string; to: string; factor: number }[] }) => (
  <TableContainer>
    <Table variant="simple">
      <TableCaption>{caption}</TableCaption>
      <Thead>
        <Tr>
          <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
        </Tr>
      </Thead>
      <Tbody>
        {factors.map((factor) => (
          <ConversionFactor key={`${factor.from}-${factor.to}`} {...factor} />
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          {/* <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th> */}
        </Tr>
      </Tfoot>
    </Table>
  </TableContainer>
);

// Finance component
const Finance = () => (
  <div className="bg-white text-black dark:text-white dark:bg-dark">
    <FinanceTable
      caption="Imperial to metric conversion factors"
      factors={[
        { from: 'inches', to: 'millimetres (mm)', factor: 25.4 },
        { from: 'feet', to: 'centimetres (cm)', factor: 30.48 },
        { from: 'yards', to: 'metres (m)', factor: 0.91444 },
      ]}
    />
  </div>
);

export default Finance;
