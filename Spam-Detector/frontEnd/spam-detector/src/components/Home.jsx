import React, { useState } from 'react';

const SpamDetector = () => {
    const [fileContent, setFileContent] = useState('');
    const [spamProbability, setSpamProbability] = useState(null);

    const handleSubmit = async () => {
        try {
            if (fileContent !== '') {
                 const response = await fetch('http://localhost:8080/api/v1/spam/file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body:   fileContent ,
            });
            const data = await response.json();
            setSpamProbability(data);
                
            }
           
        } catch (error) {
            console.error('Error:', error);
        }
       // console.log(fileContent);
    };

    return (
        <div className='bg-gray-100/100 h-screen flex flex-col items-center justify-start pt-2'>
            <h2 className='text-red-700 text-3xl font-bold ml-2 pb-4'>Test My Spam Detector</h2>
            <div >
            <textarea
                rows="8"
                cols="80"
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                placeholder="Enter file content here..."
                className='block mx-4 p-2.5  text-sm rounded-lg border-2  bg-gray-200/100 
                placeholder-gray-600 text-gray-600'
                />
                </div>
            <br />
            <button onClick={handleSubmit} className='text-white rounded-lg bg-red-700/100 px-4 py-2 hover:bg-white hover:text-red-700/100'>Submit</button>
            {spamProbability !== null && (
                <div>
                    <h3>Spam Probability:</h3>
                    {spamProbability < 0.5 ? <p>File is not Spam {spamProbability*100}%</p> : <p>File is Spam { spamProbability*100}%</p>}
                   
                </div>
            )}
        </div>
    );
};

export default SpamDetector;
