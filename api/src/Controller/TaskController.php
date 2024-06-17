<?php

namespace App\Controller;

use App\Entity\Task;
use DateTime;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class TaskController extends AbstractController
{
    #[Route('api/task/create', name: 'create_task',methods: ['POST'])]
    public function createTask(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        //Création d'une nouvelle tâche
        $task = new Task();

        $heureD = new DateTime($data['heureDebut']);
        $heureF = new DateTime($data['heureFin']);

        //Saisi des données
        $task->setLibelle($data['libelle']);
        $task->setHeureDebut($heureD );
        $task->setHeureFin($heureF);

        //Insertion des données dans la base de données
        $entityManager->persist($task);
        $entityManager->flush();


        //Retourne les données insérés en format JSON
        return $this->json([
            'status' => 'La tâche est crée',
            'task' => [
                'id' => $task->getId(),
                'heureDebut' => $task->getHeureDebut(),
                'heureFin' => $task->getHeureFin(),
            ],
        ]);
    }

    // #[Route('api/tasks/', name: 'update_task',methods: ['PUT'])]
    // public function updateTask (Request $request, EntityManager $entityManager)
    // {
    // }

}
