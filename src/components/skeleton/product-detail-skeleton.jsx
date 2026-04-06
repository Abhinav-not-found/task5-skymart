const ProductDetailSkeleton = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 py-8 animate-pulse'>
      <div className='h-4 w-48 bg-white/10 rounded mb-8'></div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-18 mb-16'>
        <div className='bg-white/5 rounded-3xl aspect-square flex items-center justify-center'>
          <div className='w-3/4 h-3/4 bg-white/10 rounded'></div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='h-6 w-24 bg-white/10 rounded-full'></div>

          <div className='h-8 w-3/4 bg-white/10 rounded'></div>
          <div className='h-8 w-1/2 bg-white/10 rounded'></div>

          <div className='h-4 w-32 bg-white/10 rounded'></div>

          <div className='h-12 w-32 bg-white/10 rounded'></div>

          <div className='space-y-2'>
            <div className='h-3 w-full bg-white/10 rounded'></div>
            <div className='h-3 w-5/6 bg-white/10 rounded'></div>
            <div className='h-3 w-2/3 bg-white/10 rounded'></div>
          </div>

          <div className='flex gap-3 mt-4'>
            <div className='flex-1 h-12 bg-white/10 rounded-2xl'></div>
            <div className='w-14 h-12 bg-white/10 rounded-2xl'></div>
          </div>

          <div className='grid grid-cols-3 gap-3 mt-4'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='h-20 bg-white/5 border border-white/10 rounded-2xl'
              ></div>
            ))}
          </div>

          <div className='flex gap-3 mt-6'>
            <div className='flex-1 h-12 bg-white/10 rounded-2xl'></div>
            <div className='flex-1 h-12 bg-white/10 rounded-2xl'></div>
          </div>
        </div>
      </div>

      <div className='h-6 w-40 bg-white/10 rounded mb-6'></div>
    </div>
  )
}

export default ProductDetailSkeleton
