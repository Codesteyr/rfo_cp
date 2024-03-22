<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Helpers\ConvertHelper;
use Carbon\Carbon;

class UserService
{

    protected $userRepository;
    private $RF_User;
    private $RF_World;
    private $convertHepler;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->convertHepler = app(ConvertHelper::class);
        $this->RF_User = DB::connection('rf_user');
        $this->RF_World = DB::connection('rf_world');
    }

    public function getUserData($user)
    {
        $persons = $this->userRepository->getPersonData($user->name);
        $className = $this->userRepository->getClassName();
        $raceName = $this->userRepository->getRaceName();

        $userData = [];
        foreach ($persons as $person) {
            $userData[] = [
                'Name' => $person->Name,
                'Race' =>  $raceName[$person->Race],
                'Class' => $className[$person->Class],
                'Lv' => $person->Lv
            ];
        }

        return [
            'user' => $user,
            'lastLoginTime' => $this->userRepository->getLastLoginTime($user->name),
            'arrayPersonData' => $userData,
        ];
    }

    public function changeUserPassword($request)
    {

        $newPassword = $request->input('password');
        $idconvert = $this->convertHepler->convertInBynary(Auth::user()->name);
        $passConvert = $this->convertHepler->convertInBynary($newPassword);

        $request->user()->update([
            'password' => Hash::make($newPassword),
            'updated_password' => Carbon::now()->addHours(3)
        ]);

        $this->RF_User->table('tbl_rfaccount')->where('id',  $idconvert)->update([
            'password' => $passConvert
        ]);

        return 'Пароль успешно изменен';
    }

    public function changeUserEmail($request)
    {

        $email = $request->input('email');
        $idconvert = $this->convertHepler->convertInBynary(Auth::user()->name);

        $request->user()->update([
            'email' => $email,
            'updated_email' => Carbon::now()->addHours(3)
        ]);

        $this->RF_User->table('tbl_rfaccount')->where('id',  $idconvert)->update([
            'Email' => $email
        ]);

        return 'Почта успешно изменена';
    }
}
