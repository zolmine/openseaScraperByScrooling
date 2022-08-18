const dict = [
    {
        name: 'Cool Cat #5886',
        tokenId: 5886,
        floorPrice: {
            amount: 5.9
        },
        displayImageUrl: 'https://img.seadn.io/files/7a2de244fe8aff5ab370ef0aec50c8d3.png?auto=format&fit=max&w=3840',
        offerUrl: 'https://opensea.io/assets/ethereum/0x1a92f7381b9f03921564a437210bb9396471050c/5886'
    },
    {
        name: 'Cool Cat #4429',
        tokenId: 4429,
        floorPrice: {
            amount: 3.4
        },
        displayImageUrl: 'https://img.seadn.io/files/b0b157aae6371679b3f71fab97bc21c1.png?auto=format&fit=max&w=3840',
        offerUrl: 'https://opensea.io/assets/ethereum/0x1a92f7381b9f03921564a437210bb9396471050c/4429'
    }
]
uniqIdentifier = '5886'

console.log(dict[0]['name']);

console.log(Object.keys(dict))