<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;


Route::middleware('auth:sanctum')->group(function () {

    // info about current user

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/getUser', [UserController::class, 'getUser']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
