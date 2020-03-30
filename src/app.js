import Model from './model/model';
import View from './view/view';
import Controller from './controller/controller';
import 'normalize.css';
import './style.scss';

const app = new Controller(new Model(), new View());
app.init();
