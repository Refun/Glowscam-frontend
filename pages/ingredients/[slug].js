import { useRouter } from 'next/router'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import path from 'path'
import axios from '@/lib/axios'

const ingredient = ({ ingredient }) => {
    const router = useRouter()

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {ingredient.slug}
                </h2>
            }>
            <Head>
                <title>Laravel </title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {ingredient.name}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export async function getStaticProps(context) {
    const { params } = context
    const slug = params.slug
    const ingredient = await axios
        .get(`/api/ingredients/${slug}`)
        .then(response => {
            return response.data.data
        })
        .catch(error => console.log(error))
    return {
        props: {
            ingredient: ingredient,
        },
    }
}

export async function getStaticPaths() {
    const ids = await axios
        .get('/api/ingredient/ids')
        .then(response => {
            return response.data.ids
        })
        .catch(error => console.log(error))

    const paths = ids.map(id => ({ params: { slug: id.toString() } }))
    return {
        paths,
        fallback: false,
    }
}

export default ingredient
