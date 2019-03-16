import CATEGORIES_PARENT from './CATEGORIES_PARENT';

export function findCategoryByLibelle(libelle) {
    if (!libelle) {
        return null;
    }
    const categoriesFound = CATEGORIES.filter(c => c.values.filter(l => libelle.includes(l)).length > 0);
    return categoriesFound.length > 0 ? categoriesFound[0] : null;
}

export const CATEGORIES = [
    // REVENUS
    {
        name: 'SALAIRE_MANU',
        libelle: 'Salaire Manu',
        parent: CATEGORIES_PARENT['REVENUS'],
        values: ['VIR SEPA RECU /DE SARL DEV1 0']
    },
    {
        name: 'SALAIRE_AURORE',
        libelle: 'Salaire Aurore',
        parent: CATEGORIES_PARENT['REVENUS'],
        values: []
    },
    {
        name: 'CAF',
        libelle: 'CAF',
        values: ['VIR SEPA RECU /DE CAF DES LANDES']
    },
    {
        name: 'TICKETS_RESTAURANTS',
        libelle: 'Tickets Restaurants',
        parent: CATEGORIES_PARENT['REVENUS'],
        values: []
    },
    {
        name: 'LES_CHEQUES_A_MAMI',
        libelle: 'Les chèques à mami',
        parent: CATEGORIES_PARENT['REVENUS'],
        values: []
    },
    {
        name: 'CREDIT_IMPOT_FAMILLE',
        libelle: 'Crédit Impôt Famille',
        parent: CATEGORIES_PARENT['REVENUS'],
        values: []
    },

    // CREDITS_ASSURANCE
    {
        name: 'ASSURANCE_PRET_BNP',
        libelle: 'Assurance Prêt BNP',
        parent: CATEGORIES_PARENT['CREDITS_ASSURANCE'],
        values: ['ECHEANCE PRET 02228', 'ECHEANCE PRET 02228 5555']
    },
    {
        name: 'PRET_BNP',
        libelle: 'Prêt BNP',
        parent: CATEGORIES_PARENT['CREDITS_ASSURANCE'],
        values: ['ECHEANCE PRET 02228', 'ECHEANCE PRET 02228 5555']
    },
    {
        name: 'PRET_1P_PATRONAL',
        libelle: 'Prêt 1% Patronal',
        parent: CATEGORIES_PARENT['CREDITS_ASSURANCE'],
        values: []
    },
    {
        name: 'ASSURANCE_PRET_PATRONAL',
        libelle: 'Assurance Prêt 1%',
        parent: CATEGORIES_PARENT['CREDITS_ASSURANCE'],
        values: []
    },
    {
        name: 'FRAIS_BANCAIRE',
        libelle: 'Frais bancaires',
        parent: CATEGORIES_PARENT['CREDITS_ASSURANCE'],
        values: []
    },
    {
        name: 'PRET_AUTO',
        libelle: 'Prêt Auto',
        parent: CATEGORIES_PARENT['CREDITS_ASSURANCE'],
        values: []
    },

    // EPARGNE
    {
        name: 'EPARGNE_PEL',
        libelle: 'Epargne PEL',
        parent: CATEGORIES_PARENT['EPARGNE'],
        values: []
    },
    {
        name: 'EPARGNE_LIVRETA',
        libelle: 'Epargne Livret A',
        parent: CATEGORIES_PARENT['EPARGNE'],
        values: []
    },
    {
        name: 'EPARGNE_ENTREPRISE',
        libelle: 'Epargne Entreprise',
        parent: CATEGORIES_PARENT['EPARGNE'],
        values: []
    },
    {
        name: 'EPARGNE_OLIANA',
        libelle: 'Epargne Oliana',
        parent: CATEGORIES_PARENT['EPARGNE'],
        values: []
    },
    {
        name: 'EPARGNE_CHEQUES_VACANCES',
        libelle: 'Epargne Chèques Vacances',
        parent: CATEGORIES_PARENT['EPARGNE'],
        values: []
    },

    // SANTE
    {
        name: 'CPAM',
        libelle: 'CPAM',
        parent: CATEGORIES_PARENT['SANTE'],
        values: []
    },
    {
        name: 'MUTUELLE',
        libelle: 'Mutuelle',
        parent: CATEGORIES_PARENT['SANTE'],
        values: []
    },
    {
        name: 'PHARMACIE',
        libelle: 'Pharmacie',
        parent: CATEGORIES_PARENT['SANTE'],
        values: []
    },
    {
        name: 'SANTE',
        libelle: 'Santé',
        parent: CATEGORIES_PARENT['SANTE'],
        values: []
    },

    // MAISON
    {
        name: 'CHARGES_COPRO',
        libelle: 'Charges Copropriétés',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'ASSURANCE_HABITATION',
        libelle: 'Assurance habitation',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'ENTRETIEN_CHAUDIERE',
        libelle: 'Entretien chaudière',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'ENERGIES',
        libelle: 'Energies',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'EAU',
        libelle: 'Eau',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'TELEPHONE',
        libelle: 'Téléphone',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'INTERNET',
        libelle: 'Internet',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'ALIMENTATION',
        libelle: 'Alimentation',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'MARCHE',
        libelle: 'Marché',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'LOGEMENT',
        libelle: 'Logement',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'CONSOMMATION',
        libelle: 'Consommation',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'RETRAIT',
        libelle: 'Retrait',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'FRAIS_PROFESSIONNELS',
        libelle: 'Frais Professionnels',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },
    {
        name: 'NON_DEFINI',
        libelle: 'Non défini',
        parent: CATEGORIES_PARENT['MAISON'],
        values: []
    },

    // ENFANT
    {
        name: 'CRECHE',
        libelle: 'Crèche',
        parent: CATEGORIES_PARENT['ENFANT'],
        values: []
    },
    {
        name: 'ENFANTS',
        libelle: 'Enfant(s)',
        parent: CATEGORIES_PARENT['ENFANT'],
        values: []
    },
    {
        name: 'ATHOME',
        libelle: 'Athome',
        parent: CATEGORIES_PARENT['ENFANT'],
        values: []
    },

    // TRANSPORT ET VEHICULES
    {
        name: 'PEAGES',
        libelle: 'Péages',
        parent: CATEGORIES_PARENT['TRANSPORT_VEHICULE'],
        values: []
    },
    {
        name: 'CARBURANT_GOLF',
        libelle: 'Carburant GOLF',
        parent: CATEGORIES_PARENT['TRANSPORT_VEHICULE'],
        values: []
    },
    {
        name: 'CARBURANT_508',
        libelle: 'Carburant 508',
        parent: CATEGORIES_PARENT['TRANSPORT_VEHICULE'],
        values: []
    },
    {
        name: 'ASSURANCES_AUTO',
        libelle: 'Assurances Auto',
        parent: CATEGORIES_PARENT['TRANSPORT_VEHICULE'],
        values: []
    },
    {
        name: 'ENTRETIEN_VEHICULES',
        libelle: 'Entretien Véhicules',
        parent: CATEGORIES_PARENT['TRANSPORT_VEHICULE'],
        values: []
    },

    // LOISIRS ET SPORTS
    {
        name: 'SPORT',
        libelle: 'Sport',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'ORANGE_BLEUE',
        libelle: 'Orange Bleue',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'PROXIFORME',
        libelle: 'Proxiforme',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'OCEANIA',
        libelle: 'Océania',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'ADC',
        libelle: 'ADC',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'HABILLEMENT',
        libelle: 'Habillement',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'LOISIRS',
        libelle: 'Loisirs',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'BIEN_ETRE',
        libelle: 'Bien-être',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'DONS',
        libelle: 'Dons',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'TABAC',
        libelle: 'Tabac',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'MULTIMEDIA',
        libelle: 'Multimédia',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'NETFLIX',
        libelle: 'Netflix',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'CADEAUX',
        libelle: 'Cadeaux',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'REPAS_BOULOT',
        libelle: 'Repas Boulot',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },
    {
        name: 'SORTIES',
        libelle: 'Sorties',
        parent: CATEGORIES_PARENT['LOISIRS_SPORTS'],
        values: []
    },

    // VACANCES
    {
        name: 'VACANCES_BZH',
        libelle: 'Vacances BZH',
        parent: CATEGORIES_PARENT['VACANCES'],
        values: []
    },

    // IMPOTS
    {
        name: 'IMPOTS_ISR',
        libelle: 'Impôts ISR',
        parent: CATEGORIES_PARENT['IMPOTS'],
        values: []
    },
    {
        name: 'IMPOTS_TAXE_FONCIERE',
        libelle: 'Impôts Taxe Foncière',
        parent: CATEGORIES_PARENT['IMPOTS'],
        values: []
    },
    {
        name: 'IMPOTS_TAXE_HABITATION',
        libelle: 'Impôts Taxe Habitation',
        parent: CATEGORIES_PARENT['IMPOTS'],
        values: []
    }
];
