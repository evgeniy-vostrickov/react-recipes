'use strict'
import { Response } from 'express'

//Ответы сервера
exports.status = (status: number, data: any, res: Response) => {
    data.status = status
    res.status(status) //Установите код состояния этого ответа.
    res.json(data) //Объекты экспресс-ответа имеют функцию json(). Функция res.json() принимает единственный параметр, объект obj, сериализует его в JSON и отправляет в теле ответа HTTP.
    res.end() //Функция res.end () используется для завершения процесса ответа.
}