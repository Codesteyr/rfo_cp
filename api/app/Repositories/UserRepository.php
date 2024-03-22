<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use App\Helpers\ConvertHelper;

class UserRepository
{

    private $RF_User;
    private $RF_World;
    private $convertHelper;

    public function __construct()
    {
        $this->convertHelper = app(ConvertHelper::class);
        $this->RF_User = DB::connection('rf_user');
        $this->RF_World = DB::connection('rf_world');
    }

    public function getLastLoginTime($username)
    {
        $idConvert = $this->convertHelper->convertInBynary($username);

        return  $this->RF_User->table('tbl_rfaccount')
            ->where('tbl_UserAccount.id', '=', $idConvert)
            ->join('tbl_UserAccount', 'tbl_UserAccount.id', 'tbl_rfaccount.id')
            ->value('lastlogintime');
    }

    public function getPersonData($username)
    {
        $persons = $this->RF_World->table('tbl_base')
            ->where('Account', '=', $username)
            ->select("Name", "Race", "Class", "Lv")
            ->get();

        return $persons->filter(function ($person) {
            return strpos($person->Name, '*') !== 0;
        });
    }

    public function getClassName()
    {
        return $className = array(
            'BWB0' => 'Воин',
            'BWF1' => 'Коммандо',
            'BWF2' => 'Миллер',
            'BWS1' => 'Берсерк',
            'BWS2' => 'Варвар',
            'BWS3' => 'Защитник',
            'BRB0' => 'Стрелок',
            'BRF1' => 'Диверсант',
            'BRF2' => 'Снайпер',
            'BRS1' => 'Наблюдатель',
            'BRS2' => 'Страж',
            'BRS3' => 'Шпион',
            'BFB0' => 'Колдун',
            'BFF1' => 'Псионик',
            'BFF2' => 'Чародей',
            'BFS1' => 'Волшебник',
            'BFS2' => 'Медиум',
            'BFS3' => 'Чудотворец',
            'BSB0' => 'Специалист',
            'BSF1' => 'Ремесленник',
            'BSF2' => 'Пилот',
            'BSS1' => 'Кузнец',
            'BSS2' => 'Технорыцарь',
            'CWB0' => 'Воин',
            'CWF1' => 'Чемпион',
            'CWF2' => 'Рыцарь',
            'CWS1' => 'Храмовник',
            'CWS2' => 'Хранитель',
            'CWS3' => 'Черный рыцарь',
            'CRB0' => 'Стрелок',
            'CRF1' => 'Лучник',
            'CRF2' => 'Охотник',
            'CRS1' => 'Наемник',
            'CRS2' => 'Отступник',
            'CRS3' => 'Ассасин',
            'CFB0' => 'Колдун',
            'CFF1' => 'Маг',
            'CFF2' => 'Вызыватель',
            'CFS1' => 'Чернокнижник',
            'CFS2' => 'Темный жрец',
            'CFS3' => 'Пастырь',
            'CSB0' => 'Специалист',
            'CSF1' => 'Ремесленник',
            'CSS1' => 'Артизан',
            'AWB0' => 'Воин',
            'AWF1' => 'Разрушитель',
            'AWF2' => 'Гладиатор',
            'AWS1' => 'Каратель',
            'AWS2' => 'Штурмовик',
            'AWS3' => 'Ландскнехт',
            'ARB0' => 'Стрелок',
            'ARF1' => 'Канонир',
            'ARF2' => 'Лазутчик',
            'ARS1' => 'Ракетчик',
            'ARS2' => 'Дементер',
            'ARS3' => 'Фантом',
            'ASB0' => 'Специалист',
            'ASF1' => 'Инженер',
            'ASS1' => 'Блок-Механик',
            'ASS2' => 'Ведущий Звена'
        );
    }

    public function getRaceName()
    {

        return $raceName = array(
            "0" => "bellato",
            "1" => "bellato",
            "2" => "cora",
            "3" => "cora",
            "4" => "accretia"
        );
    }
}
