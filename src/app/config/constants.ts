import { environment } from '../../environments/environment';

var url = 'http://localhost:3000/api';

if (environment.production) {
    url = '/api';
    //url = 'https://api-rest-letflix.herokuapp.com/api';
}

export var URL_GLOBAL = { url }