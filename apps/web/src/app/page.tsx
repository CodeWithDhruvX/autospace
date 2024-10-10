'use client'
import { useQuery } from '@apollo/client'
import { CompaniesDocument } from '@autospace/network/src/gql/Generated'
import { add } from '@autospace/sample-lib'

export default function Home() {

  const { data, loading } = useQuery(CompaniesDocument)
  // data?.registerWithCredentials.
  console.log(data);
  
  return (
    <main>
      Hello {add(3, 2)}
      <div>
        {data?.companies.map((company) => (
          <div key={company.id}>{company.displayName}</div>
        ))}
      </div>
    </main>
  )
}
