var ZD = ZD || {};

ZD.app = function(space){
	if (!ZD[space]){
		ZD[space] = {};
	}
	return ZD[space];
};