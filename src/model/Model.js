import { ClassEvent } from "../util/ClassEvent";

export class Model extends ClassEvent {

    constructor() {

        super();

        this._data = {};

    }

    fromJSON(json) {

        this._data = Object.assign(this._data, json);

        // Avisa a "todo mundo" que houve alteração
        // E passe a alteracao
        this.trigger('datachange', this.toJSON())

    }

    toJSON(){

        return this._data;

    }

}