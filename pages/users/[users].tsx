import axios from 'axios';

export default function Users(ProductsData: any) {
    return(
        <>
            <div className="main">
                <h1>Produtos:</h1>
                {ProductsData.ProductsData.map((data: any) => {
                    return <div key={data.name} className="product">
                        <h1 className="productTitle">{data.name}</h1>
                        <img className="productImage" src={data.icon} alt="imagem" />
                    </div>
                })}
            </div>
        </>
    )
}

export const getStaticPaths = async () => {
    const res = await axios.get('http://localhost:3000/api/getLinksDB')
    const db = res.data;
    
    const paths = db.map((data: any) => {
        return{
            params: { users: data.link }
        }
    })

    return{
        paths,
        fallback: false
    }
}

export async function getStaticProps(){
    const res = await axios.get('http://localhost:3000/api/getLinksDB')
    const data = res.data;

    var Allproducts = data[0].productsIDs;
    var ArrProducts = Allproducts.split(',').map(Number);

    var ResProductsData = await axios.post('http://localhost:3000/api/getUserProductsFromIDs', { ArrProducts })
    var ProductsData = ResProductsData.data

    return{
        props: { ProductsData }
    }
}

/*

export async function getStaticProps(context: any){
    const users = context.params.users;

    return{
        props: {
            users: users
        }
    }
}


async function AdicionarCadaProdutoDoUsuarioEmTela(item: any){
    try{
        let res = await axios.post('/api/GetProductsNames', { item });

        console.log(res.data);

        const para = document.createElement("p");
        para.id = "1";
        const node = document.createTextNode(res.data.name);
        para.appendChild(node);

        const element = document.getElementById("ProductListID");
        element.appendChild(para);
    }
    catch{
        console.log("Axios Error [users.tsx]");
    }
}



async function PegarProdutosDoUsuario(context){
    const thisURL = context.users;
    try{
        let res = await axios.post('/api/GetProductsFromLinks', { thisURL });
        //var array = JSON.parse(res.data.productsIDs);

        var ArrayInString = res.data.productsIDs;
        var array = ArrayInString.split(',').map(Number);
    }
    catch{
        console.log("Axios Error [users.tsx]");
    }
    
    if(array){
        array.forEach(AdicionarCadaProdutoDoUsuarioEmTela);
    }
}

function Details(context){
    //PegarProdutosDoUsuario(context);

    return(
        <div>
            <h1>Details Page</h1>
            <ul id="ProductListID" className="ProductList"></ul>
        </div>
    );
}

export default Details;

*/

