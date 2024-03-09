<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\AuthAionService;
use Carbon\Carbon;
use App\Services\LogService;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{

    protected $logService;

    // public function __construct(LogService $logService)
    // {
    //     $this->logService = $logService;
    // }


    public function signup(Request $request)
    {

        $data = $request->validated();
        $ip = $request->getClientIp();

        unset($data['recaptchaToken']);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => 'user',
            'coin' => 0,
            'agreement' => $data['agreement'],
            'password' => bcrypt($data['password']),
            'updated_password' => Carbon::now(),
            'updated_email' => Carbon::now()
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {

        $credentials = $request->validated();
        $ip = $request->getClientIp();

        unset($credentials['recaptchaToken']);

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        // $this->logService->accessLog($user, $ip);

        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {

        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
