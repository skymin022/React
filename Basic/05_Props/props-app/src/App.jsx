import './App.css';
import ProductDetail from './Components/ProductDetail.jsx';

const App = () => {
      // ✅ 객체 추가
    const product = {
        productId : 'p000001',
        name : '베이직 폴라 니트',
        price : 42000,
        quantity : 1,
        img: 'https://i.imgur.com/1vpSkbW.png',
    }
  return (
  <>

  <ProductDetail product={product} />
  </>
  )
}

export default App