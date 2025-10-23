import AdvancedFullForm from '@/components/forms/advanced-full-form'
import { FormTanstackArray } from '@/components/forms/array-fields-form'
import { BugReportForm } from '@/components/forms/bug-report-form'

import { ExtendedBugReportForm } from '@/components/forms/extended-bug-report-form'
import { MutipleFieldsArrayForm } from '@/components/forms/mutiple-fields-array-form'

export default function Home() {
  return (
    <div className='container mx-auto flex w-full'>
      <div className='mx-auto mt-8 flex flex-col space-y-8 sm:min-w-md'>
        {/* <ExtendedBugReportForm /> */}
        {/* <FormTanstackArray /> */}
        <MutipleFieldsArrayForm />
      </div>
    </div>
  )
}
