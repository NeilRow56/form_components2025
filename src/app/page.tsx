import { BugReportForm } from '@/components/forms/bug-report-form'

export default function Home() {
  return (
    <div className='container mx-auto flex w-full'>
      <div className='mx-auto mt-48 flex sm:min-w-md'>
        <BugReportForm />
      </div>
    </div>
  )
}
