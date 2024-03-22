<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function getUser(Request $request)
    {
        $user = $request->user();

        $userData = $this->userService->getUserData($user);
        Log::info(json_encode($userData, JSON_UNESCAPED_UNICODE));

        return response(compact('userData'));
    }
}
