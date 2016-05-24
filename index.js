var fs = require('fs');
var Table = function(dir, name){
	var self = this;
	self.name = name;
	
	self.data = [];
	self.load = function(){
		if ( !fs.existsSync(dir+name+'.json') )
			self.save();
		else
			self.data = JSON.parse( fs.readFileSync(dir + name +'.json') );
	}
	self.save = function(){
		fs.writeFileSync(dir+name+'.json', JSON.stringify( self.data ) );
	}
	self.get = function(id){
		for( var i = 0; i < self.data.length; i++ )
			if( self.data[i].id == id )
				return self.data[i];
		return false;
	}
	self.insert = function(obj){
		delete obj.id;
		obj.id = Date.now();
		var append;
		do{
			append = '-';
			for( var i = 0; i < 3; i++ )
				append += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26));
		} while( self.get( obj.id + append ) !== false )
		obj.id += append;
		self.data.push( obj );
		self.save();
		return obj;
	}
	self.update = function(id, obj){
		delete obj.id;
		for( var i = 0; i < self.data.length; i++ ){
			if( self.data[i].id == id ){
				self.data[i] = Object.assign( { 'id': id }, obj );
				self.save();
				return self.data[i];
			}
		}
		return false;
	}
	self.delete = function(id){
		for( var i = 0; i < self.data.length; i++ ){
			if( self.data[i].id == id ){
				self.data.splice(i,1);
				self.save();
				return true;
			}		
		}
		return false;
	}
	
	self.load();
}
this.init = function(dir, tables){
	var self = this;
	dir = dir.charAt(dir.length-1) == '/'? dir: dir+'/';
	
	if ( !fs.existsSync(dir) )
		fs.mkdirSync(dir);
	
	self.tables = {};
	for( var i in tables ){
		self.tables[tables[i]] = new Table(dir, tables[i]);
	}
	self.query = function(query){
		var params = [];
		var j;
		for( var i in self.tables ){
			j = query.replace('{'+ i +'}', '?');
			if( j != query ){
				params.push( self.tables[ i ].data );
				query = j;
			}
		}
		return require('alasql')( query, params );
	}
	return self;
}