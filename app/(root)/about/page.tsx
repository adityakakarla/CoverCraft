import React from 'react'

const Page = () => {
  return (
    <div className='flex flex-col items-center'>
        <h1 className='mt-24 text-4xl font-semibold'>
            There&apos;s a question we get all the time:
        </h1>
        <h1 className='mt-16 font-bold text-6xl'>
        &quot;Why can&apos;t I just use ChatGPT?&quot;
        </h1>
        <div className='mt-24 text-2xl flex flex-col items-center text-left'>
        <h1 className='mb-8 font-semibold'>
          Here&apos;s why:
        </h1>
        <ol className='list-decimal'>
          <li className='py-1'>
            Our prompting technique is backed by <strong>peer-reviewed research</strong> and <strong>outperforms GPT-4</strong>.
          </li>
          <li className='py-1'>
            We securely store your resume. No more copy-and-pasting from your Overleaf template.
          </li>
          <li className='py-1'>
            Our prompts were <strong>specifically built for SWE internship cover letters</strong>. ChatGPT is generic.
          </li>
        </ol>
        </div>
    </div>
  )
}

export default Page