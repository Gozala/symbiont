var request2promise = function(request) {
  return new Promise(function(resolve, reject) {
    request.onsuccess = function() {
      resolve(request.result)
    }
    request.onerror = function() {
      reject(request.error)
    }
  })
}

function Connection(db, storeName) {
  this.db = db
  this.storeName = storeName
}
Connection.prototype.transact = function(mode, transaction) {
  return transaction(this.db.
                      transaction(this.storeName, mode).
                      objectStore(this.storeName))
}

function IndexedStorage(dbName, storeName, version) {
  this.dbName = dbName || this.dbName
  this.storeName = storeName || this.storeName
  this.version = version || this.version
  this.connection = this.connect(this.dbName, this.storeName, this.version)
}
IndexedStorage.prototype.name = "IndexedStorage"
IndexedStorage.prototype.storeName = "IndexedStorage"
IndexedStorage.prototype.version = 1
IndexedStorage.prototype.connect = function(dbName, storeName, version) {
  return new Promise(function(resolve, reject) {
    var request = window.indexedDB.open(dbName, version)
    request.onupgradeneeded = function() {
      request.result.createObjectStore(storeName)
    }
    request.onsuccess = function() {
      resolve(new Connection(request.result, storeName))
    }
    request.onerror = function() {
      reject(request.error)
    }
  })
}
IndexedStorage.prototype.transact = function(mode, action) {
  return this.connection.then(function(connection) {
    return connection.transact(mode, action)
  }).then(request2promise)
}
IndexedStorage.prototype.get = function(key) {
  return this.transact("readonly", function(store) {
    return store.get(key)
  })
}
IndexedStorage.prototype.set = function(key, value) {
  return this.transact("readwrite", function(store) {
    return store.put(value, key)
  }).then(function(_) {
    return value
  })
}
IndexedStorage.prototype.delete = function(key) {
  return this.transact("readwrite", function(store) {
    return store.delete(key)
  })
}
IndexedStorage.prototype.clear = function() {
  return this.transact("readwrite", function(store) {
    return store.clear()
  })
}

exports.IndexedStorage = IndexedStorage
