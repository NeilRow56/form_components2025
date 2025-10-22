import AdvancedFullForm from '@/components/forms/advanced-full-form'
import { BugReportForm } from '@/components/forms/bug-report-form'

export default function Home() {
  return (
    <div className='container mx-auto flex w-full'>
      <div className='mx-auto mt-8 flex flex-col space-y-8 sm:min-w-md'>
        {/* <BugReportForm /> */}
        <AdvancedFullForm />
      </div>
    </div>
  )
}
