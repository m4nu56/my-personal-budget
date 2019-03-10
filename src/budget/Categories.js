export function checkerCategorie(libelle) {
    if (!libelle) {
        return null;
    }
    let categorieName = Object.keys(categories)
        .filter(c => {
            let categ = categories[c]['values'].filter(l => libelle.includes(l));
            console.log(`libelle=${libelle};categ=${categ}`, categ);
            return categ.length > 0;
        })
        .filter(res => {
            console.log(`res = ${res}`);
            return res;
        });
    return categories[categorieName];
}

export const categories = {
    salaire_manu: {
        name: 'SALAIRE_MANU',
        libelle: 'Salaire Manu _ ',
        values: ['VIR SEPA RECU /DE SARL DEV1 0']
    },
    pret_bnp: {
        name: 'PRET_BNP',
        libelle: 'Prêt BNP _',
        values: ['ECHEANCE PRET 02228', 'ECHEANCE PRET 02228 5555']
    },
    caf: {
        name: 'CAF',
        libelle: 'CAF _',
        values: ['VIR SEPA RECU /DE CAF DES LANDES']
    }
};
