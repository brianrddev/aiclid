export default function NewsForm() {
    return (
        <form className="flex items-center justify-between bg-black text-white py-4 px-6 mx-20">
            <div className="whitespace-nowrap mr-4">
                Suscríbete a nuestra newsletter
            </div>
            <input 
                type="email" 
                placeholder="Email address" 
                className="flex-grow mx-4 px-4 py-2 bg-transparent border border-gray-600 rounded"
            />
            <button 
                type="submit" 
                className="whitespace-nowrap px-6 py-2 uppercase text-sm font-medium border border-white rounded hover:bg-white hover:bg-opacity-10"
            >  
                Suscribir
            </button>
        </form>
    );
}