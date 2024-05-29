import React from 'react'

const Table = (props) => {
    const data = props.data;

    return (
      
      <table className='w-full' >
          <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr>
                  <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                      File
                  </th>
                  <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                      Spam Probability
                      
                  </th>
                  <th className='p-3 text-sm font-semibold tracking-wide text-left'>
                      Actual Class
                      
                  </th>
                  
              </tr>
          </thead>
          <tbody>
              
                 {data.map((item, index) => (
                  <tr key={index} className=''>
                    {/* Replace with your data fields */}
                    <td className='p-3 text-sm text-gray-700'>{item.file.slice(0,5)}</td>
                    <td className='p-3 text-sm text-gray-700'>{(item.spamProbRounded*100).toFixed(2)}</td>
                    <td className='p-3 text-sm text-gray-700'>{item.actualClass}</td>
                  </tr>
                ))}
            
              
              
          </tbody>
    </table>
  )
}

export default Table
