function getAllParty(req, res) {
    return res.json({
        data: [
            { name: 'BJP', icon: null, party_id: '1' },
            { name: 'Congress', icon: null, party_id: '2' },
            { name: 'NCP', icon: null, party_id: '3' },
            { name: 'BSP', icon: null, party_id: '4' },
        ]
    });
}

module.exports = { getAllParty };